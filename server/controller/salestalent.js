
import { Salestalent } from "../models/index.js";


const createSalestalent = async (req, res) => {
    console.log("DEBUG 1000000000000001");
    console.log("Request.body = "+req.body);
  const salestalent = new Salestalent(req.body);

  console.log(salestalent.email);
  try {
    await salestalent.save();
    const token = await salestalent.generateAuthToken();
    console.log("Tken is this = "+ token)
    res.status(201).send({ salestalent, token });
  } catch (e) {
    console.log(e);
    if (e?.keyPattern?.email === 1) {
      return res.status(400).send({
        error: "Email Already Exists",
      });
    }
    if (e?.keyPattern?.mobileNo === 1) {
      return res.status(400).send({
        error: "Mobile No Already Exists",
      });
    }
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const loginSalestalent = async (req, res) => {
  try {
    const salestalent = await Salestalent.findUsingCredentials(
      req.body.email,
      req.body.password
    );

    const token = await salestalent.generateAuthToken();
    res.status(200).send({ salestalent, token });
  } catch (e) {
    res.status(404).send({ error: "Invalid Credentials" });
  }
};


export {
  createSalestalent,
  loginSalestalent,

};
