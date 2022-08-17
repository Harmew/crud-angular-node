const router = require("express").Router();
const Client = require("../models/Client");

router.post("/", async (req, res) => {
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    job: req.body.job,
  });

  try {
    const result = await client.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao cadastrar cliente");
  }
});

router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    await client.remove();
    res.status(200).json({ message: "Cliente excluido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    client.name = req.body.name;
    client.email = req.body.email;
    client.phone = req.body.phone;
    client.job = req.body.job;

    const result = await client.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
