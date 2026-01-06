const transactionmodel = require("../models/transcation");
const moment = require("moment");
const getdata = async (req,res)=>{
    try{
        const {frequency,selectdate,type} = req.body;
        const transactions = await transactionmodel.find({
            ...(frequency !== 'Custom' ? {
                date:{
                $gt : moment().subtract(Number(frequency),'d').toDate(),
            },
            } : {
                date : {
                    $gte : selectdate[0],
                    $lte : selectdate[1],
                }
            }),userid:req.body.userid,
            ...(type !== 'all' && {type})
            
         });
        res.status(200).json(transactions);
    }
    catch(Err)
    {
        console.log(Err);
        res.status(500).json(Err);
    }

};
const adddata = async (req,res)=>
{
    try{
        const newtransaction = new transactionmodel(req.body);
        await newtransaction.save();
        res.status(201).send("Transaction Created");
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }

};

module.exports = {getdata,adddata};