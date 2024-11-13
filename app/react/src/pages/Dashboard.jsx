import {useEffect, useState} from "react";  import TButton from "../components/TButton.jsx";  import {EyeIcon, PencilIcon} from "@heroicons/react/24/outline";
//
import PageComponent from "../components/PageComponent.jsx";  import {axios1} from "../../axios.js";  import DashboardCard from "../components/DashboardCard.jsx";



export default function Dashboard() {
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState({});

    useEffect(function() { setLoading(true);  axios1.get("/dashboard").then(function(response) { setData(response.data);  setLoading(false); }); }, []);

    let numerOfProperties = 0; for (let property in data) { numerOfProperties++; }
    if (loading) return <PageComponent title="Dashboard"><div className="flex justify-center">Loading...</div></PageComponent>;
    if (numerOfProperties) {
    return (<>
        <PageComponent title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
                <DashboardCard title="Surveys created" className="order-1 lg:order-2" style={{animationDelay: "0.1s"}}>
                    <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">{data.numberTotalSurveys}</div>
                </DashboardCard>
                <DashboardCard title="Answers received" className="order-2 lg:order-4" style={{animationDelay: "0.2s"}}>
                    <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">{data.numberTotalAnswers}</div>
                </DashboardCard>
                <DashboardCard title="Latest Survey" className="order-3 lg:order-1 row-span-2" style={{animationDelay: "0.2s"}}>
                    {!data.lastSurveyCreated && <div className="text-gray-600 text-center py-16">You don't have surveys yet</div>}
                    {data.lastSurveyCreated && <>
                        <div>
                            <img src={data.lastSurveyCreated.image} className="w-[240px] mx-auto" />
                            <h3 className="font-bold text-xl mb-3">{data.lastSurveyCreated.title}</h3>
                            <div className="flex justify-between text-sm mb-1"><div>Create Date:</div><div>{data.lastSurveyCreated.created_at}</div></div>
                            <div className="flex justify-between text-sm mb-1"><div>Expire Date:</div><div>{data.lastSurveyCreated.expire_date}</div></div>
                            <div className="flex justify-between text-sm mb-1"><div>Status:</div><div>{data.lastSurveyCreated.status ? "Active" : "Draft"}</div></div>
                            <div className="flex justify-between text-sm mb-1"><div>Number of questions this survey had:</div><div>{data.lastSurveyCreated.numberOfQuestions}</div></div>
                            <div className="flex justify-between text-sm mb-3"><div>Number of answers for this survey:</div><div>{data.lastSurveyCreated.numberOfAnswers}</div></div>
                            <div className="flex justify-between"><TButton to={`/surveys/${data.lastSurveyCreated.id}`} link><PencilIcon className="w-5 h-5 mr-2" />Edit Survey</TButton></div>
                        </div>
                    </>}
                </DashboardCard>
                <DashboardCard title="Latest Answers" className="order-4 lg:order-3 row-span-2" style={{animationDelay: '0.3s'}}>
                    {!data.last5Answers?.length && <div className="text-gray-600 text-center py-16">Your don't have answers yet</div>}
                    {data.last5Answers?.length && 
                        <div className="text-left">
                            {data.last5Answers.map(function(answer) {
                                return <a href="#" key={answer.id} className="block p-2 hover:bg-gray-100/90">
                                           <div className="font-semibold">At survey: {answer.survey.title}</div>
                                           <small>Made at <i className="font-semibold">{answer.end_date}</i> by <i className="font-semibold">{answer.user.name}</i></small>
                                       </a>
                            })}
                        </div>
                    }
                </DashboardCard>
            </div>
        </PageComponent>
    </>);
    }
}