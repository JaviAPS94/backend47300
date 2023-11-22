const purchaseOrder = () => {
    if(stock <= 0) {
        throw StockInvalid({ cause, description });
    }
}