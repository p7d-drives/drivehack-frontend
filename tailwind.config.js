import {
    keepTheme
} from "keep-react/keepTheme";

const config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: '2rem'
        }
    },
}

export default keepTheme(config);