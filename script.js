function serveFile(fileId) {
    try {
        Logger.log("Requesting fileId: " + fileId);
        const file = DriveApp.getFileById(fileId);
        Logger.log("File found: " + file.getName());
        const blob = file.getBlob();
        
        return ContentService.createTextOutput(blob.getBytes())
            .setMimeType("audio/mpeg"); // MP3のMIMEタイプを明示的に設定
    } catch (error) {
        Logger.log("Error: " + error);
        return ContentService.createTextOutput(`Error: File not found - ${fileId}`)
            .setMimeType(ContentService.MimeType.TEXT);
    }
}
