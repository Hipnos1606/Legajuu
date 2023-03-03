const Text = {
    pascalCase: (text) => {
        return text.split(" ").map((word) => {
            return word.split("").map((letter, index) => {
                return index === 0 ? letter : letter.toLowerCase();
            }).join("");
        }).join(" ");
    },

    camelCase: (text) => {},
    snakeCase: (text) => {},
    kebabCase: (text) => {},
}

export default Text;

