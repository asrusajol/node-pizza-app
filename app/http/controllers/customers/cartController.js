function cartController(){
    return{
        index(req,res){
            res.render('customers/cart')
        },
        update(req,res){
            let cart ={
                items:{
                    pizzaID:{item: pizzaObject, qty:0}
                },
                totalQty:0,
                totalPrice: 0
            }
            return res.json({data:'alls are fine'})
        }
    }
}

module.exports=cartController