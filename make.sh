FILE_NAME=$(grep \"version\" manifest.json |cut -d: -f 2 |cut -d\" -f2).zip
rm -f *.zip
zip ${FILE_NAME} -r icons/ main.js manifest.json popup.html
