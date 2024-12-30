function countValidPasswords(passwords) {
    let validCount = 0;

//*if you want to change priority, put (\w) before :, and "letter" before "password" in const [] *//
    passwords.forEach(line => {
        const match = line.match(/(\w) (\d+)-(\d+): (\w+)/); 

        if (match) {
            const [_, letter, min, max, password] = match;
            const count = password.split('').filter(char => char === letter).length;

            if (count >= parseInt(min) && count <= parseInt(max)) {
                validCount++;
            }
        }
    });

    return validCount;
}
document.getElementById('checkPasswords').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const resultOutput = document.getElementById('result');

    if (!fileInput.files.length) {
        resultOutput.textContent = "Choose a file";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result;
        const passwordLines = fileContent.split('\n').map(line => line.trim()).filter(line => line);

        const validCount = countValidPasswords(passwordLines);
        resultOutput.textContent = `Count of correct passwords: ${validCount}`;
    };

    reader.onerror = function () {
        resultOutput.textContent = "Error 404";
    };

    reader.readAsText(file);
});