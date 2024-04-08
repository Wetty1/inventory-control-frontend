import axios from "./index";

class Test {
  static Testing = (data) => {
    return axios.post(`${base}/test`, data);
  };
}

let base = "test";
export default Test;

// async function Test(req, res) {
//   return res.status(201).json({
//     test: true,
//   });
// }
