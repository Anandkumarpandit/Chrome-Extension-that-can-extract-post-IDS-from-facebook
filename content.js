function extractPostIdAutomatically() {
    let pid = new Set();

    function extractPostIdsFromPage() {
        const aTags = document.querySelectorAll('.x1i10hfl');

        aTags.forEach(aTag => {
            let hrefValue = aTag.getAttribute('href');

            if (hrefValue) {
                const regex = /\/posts\/([^?]+)/;
                const matches = hrefValue.match(regex);

                if (matches) {
                    pid.add(matches[1]);
                }
            }
        });

        // Store the extracted post IDs in Chrome's local storage
        chrome.storage.local.get(['pid'], async (result) => {
            if (result.pid !== undefined) {
                const set1 = await result.pid;
                const myArray = Array.from(pid);
                const concat = [...set1, ...myArray]; // may contain the same value
                // Get a unique array
                const myNewArray = [...new Set(concat)];

                // Store in local storage
                await chrome.storage.local.set({ 'pid': myNewArray });
            } else {
                const myArray = Array.from(pid);
                await chrome.storage.local.set({ 'pid': myArray });
            }
        });
    }

    // Create a MutationObserver to detect when new content is loaded
    const observer = new MutationObserver((mutationsList) => {
        extractPostIdsFromPage();
    });

    // Specify the target node and configuration
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    // Start observing
    observer.observe(targetNode, config);

    // Initial extraction
    extractPostIdsFromPage();
}

// Automatically extract post IDs when the content script runs
extractPostIdAutomatically();
