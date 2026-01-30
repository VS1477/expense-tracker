import { Progress } from "antd";

export const Analytics = (props)=>
{
    const {alltransaction} = props;
    //Total Transactions
    const totaltransaction = alltransaction.length;
    const totalincometransaction = alltransaction.filter(alltransaction => alltransaction.type === 'income');
    const totalexpensetransaction = alltransaction.filter(alltransaction=>alltransaction.type === 'expense');
    const totalincomepercent = (totalincometransaction.length/totaltransaction)*100;
    const totalexpensepercent = (totalexpensetransaction.length/totaltransaction)*100;
    const categories = ['salary','tip','project','food','movie','bills','medical','fee','tax'];
    // Total TurnOver 

    const totalturnover = alltransaction.reduce((acc,total)=>acc+total.amount,0);
    const totalincometurnover = alltransaction.filter((trans)=>trans.type==='income').reduce((acc,sum)=>acc+sum.amount,0);
    const totalexpenseturnover = alltransaction.filter((trans)=>trans.type==='expense').reduce((acc,sum)=>acc+sum.amount,0);
    const incometurnoverpercent = (totalincometurnover/totalturnover)*100;
    const expenseturnoverpercent = (totalexpenseturnover/totalturnover)*100;



    return (
        <div className="analytics-section">
        <div className="row m-3">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        Total Transactions : {totaltransaction}
                    </div>
                    <div className="card-body">
                        <h5 className="text-success">money In : {totalincometransaction.length}</h5>
                        <h5 className="text-danger">Money Out : {totalexpensetransaction.length}</h5>
                        <div>
                            <Progress type="circle" strokeColor={"green"} className="mx-2" percent = {totalincomepercent.toFixed(0)}/>
                            <Progress type="circle" strokeColor={"red"} className="mx-2" percent = {totalexpensepercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="col-md-6">
                <div className="card">  
                    <div className="card-header">
                        Money Movement : {totalturnover}
                    </div>
                    <div className="card-body">
                        <h5 className="text-success">Income : {totalincometurnover}</h5>
                        <h5 className="text-danger">Expense : {totalexpenseturnover}</h5>
                        <div>
                            <Progress type="circle" strokeColor={"green"} className="mx-2" percent = {incometurnoverpercent.toFixed(0)}/>
                            <Progress type="circle" strokeColor={"red"} className="mx-2" percent = {expenseturnoverpercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-md-6">
                <h4>Categorywise Income</h4>
                {
                    categories.map(category=>{
                        const amount = alltransaction.filter((transaction)=> transaction.type === 'income' && transaction.category === category)
                        .reduce((acc,trans)=>acc+trans.amount,0);
                        return(
                            amount > 0 && (
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress percent = {((amount/totalincometurnover)*100).toFixed(0)}/>
                                </div>
                            </div>
                            )
                        )
                    })
                }

            </div><div className="col-md-6">
                <h4>Categorywise Expense</h4>
                {
                    categories.map(category=>{
                        const amount = alltransaction.filter((transaction)=> transaction.type === 'expense' && transaction.category === category)
                        .reduce((acc,trans)=>acc+trans.amount,0);
                        return(
                            amount > 0 && (
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    
                                    <Progress percent = {((amount/totalexpenseturnover)*100).toFixed(0)}/>
                                </div>
                            </div>
                            )
                        )
                    })
                }

            </div>
        </div>
        </div>
    )

}