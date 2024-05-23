document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  e.preventDefault();
  let issueDesc = document.getElementById('issueDescInput').value;
  let issuesSeverity = document.getElementById('issueSeverityInput').value;
  let issuesAssignedTo = document.getElementById('issueAssignedToInput').value;
  let issueId = generateUUID();
  let issuesStatus = 'Open';

  let issue = {
    id: issueId,
    description: issueDesc,
    severity: issuesSeverity,
    assignedTo: issuesAssignedTo,
    status: issuesStatus,
  };

  let issues = JSON.parse(localStorage.getItem('issues')) || [];

  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();

  fetchIssues();
}

function setStatusClosed(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
      break;
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1); // Remove the issue from the array
      break; // Once deleted, exit the loop
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues'));
  let issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  if (issues) {
    for (let i = 0; i < issues.length; i++) {
      let id = issues[i].id;
      let desc = issues[i].description;
      let severity = issues[i].severity;
      let assignedTo = issues[i].assignedTo;
      let status = issues[i].status;

      issuesList.innerHTML += `
      <div class="well">
      <h6>Issue ID: ${id}</h6>
      <p><span class="badge bg-info">${status}</span></p>
      <h3>${desc}</h3>
      <p><i class="fa fa-clock"></i> ${severity}</p>
      <p><i class="fa fa-user"></i> ${assignedTo}</p>
      <a href="#" onClick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
      <a href="#" onClick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
    </div>
      `}
  }
}

function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
