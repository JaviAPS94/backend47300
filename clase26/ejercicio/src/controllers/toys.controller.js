import { saveToy as saveToyService, getToys as getToysService} from "../services/toys.service.js";

const saveToy = async (req, res) => {
    try {
        const toy = req.body;
        await saveToyService(toy);
        res.send({ payload: toy });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getToys = async (req, res) => {
    try {
        const toys = await getToysService();
        res.send({ payload: toys });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export {
    saveToy,
    getToys
}