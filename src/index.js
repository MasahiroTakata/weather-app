import ReactDOM from "react-dom"; // react標準で用意しているモジュールは{}は不要
import { App } from "./App"; // 独自で作成したコンポーネントは{}が必要

ReactDOM.render(<App />, document.getElementById("root"));