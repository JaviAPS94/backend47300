const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const result = await cartService.addProductToCart(cid, pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}

export {
    addProductToCart
}