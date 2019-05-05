function toCsv(f) {
    let csv = [];
    let rows = $('span')
    for (let i = 0; i < rows.length; i++) {
        let row = []
        row.push(rows.eq(i).text());
        csv.push(row.join(","));        
    }
    downloadCSV(csv.join(","), f);
}


function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;
    csvFile = new Blob([csv], {type: "text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}