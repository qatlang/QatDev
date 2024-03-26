export function dataUrlToBlob(dataURI: string): Blob {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.substring(
		dataURI.indexOf(":") + 1,
		dataURI.indexOf(";")
	);
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	var blob = new Blob([ab], { type: mimeString });
	return blob;
}