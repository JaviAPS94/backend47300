const saveUser = async (req, res) => {
    try {
        const user = req.body;
        await saveUserService(user);
        res.send({ payload: user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        res.send({ payload: users });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export {
    saveUser,
    getUsers
}