// Send a message to the content script to extract post id
function extractPostId() {
    chrome.storage.local.get(['pid']).then((result) => {
    displayPostId(result.pid);
    });
    }
    
    // Display the extracted post id in the popup
    function displayPostId(pid) {
    if (pid === undefined) {
    alert('No Post id detected')
    }
    else {
    const postIdList = document.getElementById('pid');
    postIdList.innerHTML = '';
    
    pid.forEach((postId) => {
    const listItem = document.createElement('li');
    listItem.textContent = postId;
    postIdList.appendChild(listItem);
    });
    }
    if (pid === undefined) {
    const count = 0;
    const counter = document.querySelector('.counter');
    counter.innerHTML = `<h2> Total Post id's: ${count} </h2> `;
    }
    else{
    const count = pid.length;
    const counter = document.querySelector('.counter');
    counter.innerHTML = `<h2> Total Post id's: ${count} </h2> `;
    }
    }
    extractPostId();
    
    //////***************** Save posts id as .txt ****************//////
    const save_button = document.querySelector('.save-button');
    save_button.addEventListener('click', () => {
    chrome.storage.local.get(['pid']).then((result) => {
    const pid = result.pid;
    
    const text = pid.join("\n");
    
    // Create a data URI for the text file content
    const dataUri = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    
    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUri;
    downloadLink.download = "Posts_id's.txt";
    downloadLink.innerHTML = "Download";
    
    // Append the download link to the document body
    document.body.appendChild(downloadLink);
    
    // Trigger the download programmatically
    downloadLink.click();
    
    // Cleanup: Remove the download link from the document body
    document.body.removeChild(downloadLink);
    
    });
    })
    
    ////////////////////////////////// Clear all post id's //////////////////////////////////////
    const clear_button = document.querySelector(".clear-button");
    clear_button.addEventListener("click", () => {
    var result = confirm("Are you sure you want to clear all posts id's?");
    if (result == true) {
    // The post clicked "OK"
    chrome.storage.local.remove('pid', function () {
    console.log('Specific key cleared from Chrome storage.');
    });
    }
    }); 