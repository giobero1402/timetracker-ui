import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UrlFetchApp, UrlPostApp} from "@/scripts/fetch";
import endpoints from "@/scripts/endpoints";
import {useRouter} from "expo-router";

const AppContext = createContext<any>({});

export default function AppProvider({children}: {children: ReactNode}) {
    const app = useAppProvider()

    return (
        <AppContext.Provider value={app}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext)
}

function useAppProvider(){
    const [loading, setLoading] = useState<boolean>(true);
    const [accounts, setAccounts] = useState<any>([]);
    const [account, setAccount] = useState<any>({});
    const [status, setStatus] = useState<any>();

    const [jobs, setJobs] = useState<any[]>([]);
    const [todayJobs, setTodayJobs] = useState([]);
    const [nextJob, setNextJob] = useState<{}>({});
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            let storageEmployee:any = JSON.parse(localStorage.getItem('employee')||'{}') || {};
            console.log("STORAGE:",!!storageEmployee.email);
            if(!storageEmployee.email){
                const data = await UrlFetchApp(endpoints.employees(``), 'GET')
                setAccounts([...data.employees, {first_name: "Testing", last_name: 'Profile', email: "giobero1402@gmail.com", id: 'pro_09a36d254a9f47c8be2d60b415b8b83e'}])

                setLoading(false)

                return router.navigate('/login');

                // const employee = data.employees.find((value:any) =>
                //     value.id === 'pro_09a36d254a9f47c8be2d60b415b8b83e'
                // )
            }

            setAccount(storageEmployee)

            const jobs = await UrlFetchApp(endpoints.jobs(`page_size=15&employee_ids[]=${storageEmployee?.id}`), 'GET')
            // @ts-ignore
            const sortJobs = jobs.jobs.sort((a:any, b:any) => new Date(b.schedule.scheduled_start) - new Date(a.schedule.scheduled_start))
            setJobs(sortJobs)

            const filter = sortJobs.filter((value:any) => {
                const itemDate = new Date(value.schedule.scheduled_start)
                return itemDate > startOfDay && itemDate < tomorrow;
            })

            setTodayJobs(filter)

            console.log(filter)

            // @ts-ignore
            setNextJob(filter.filter((value:any) => {
                const itemDate = new Date(value.schedule.scheduled_start)
                return itemDate > today && itemDate < tomorrow;
            }).sort((a:any, b:any) => new Date(a.schedule.scheduled_start) - new Date(b.schedule.scheduled_start))[0])

            setStatus(JSON.parse(localStorage.getItem('jobs') || '{}'))

            setLoading(false)
        }

        fetchData()
    }, []);

    const saveInfo = async (data:any) => {
        const body = {
            employee: `${account.first_name} ${account.last_name}`,
            start: data.start,
            stop:data.stop,
        }
        const bodyJob = {
            job_id: data.job_id,
            employee: `${account.first_name} ${account.last_name}`,
            start: data.start,
            stop: data.stop,
            customer: data.customer,
        }
        const state = data.stop ? 'stop' : 'start'
        const s = {
            state,
            date: new Date(),
        }
        const sJobs = JSON.parse(localStorage.getItem('jobs') || '{}');
        const update = {...sJobs, [data.job_id]: s}
        localStorage.setItem('jobs', JSON.stringify(update))
        setStatus(update)
        //const job = jobs.findIndex((value:any) => value.id === data.job_id)
        // jobs[job] = {...jobs[job], work_timestamps: {
        //         started_at: data.start ? data.start : jobs[job].work_timestamps.started_at,
        //         completed_at: data.stop ? data.stop : jobs[job].work_timestamps.completed_at,
        //         on_my_way_at: data.omw ? data.omw : jobs[job].work_timestamps.on_my_way_at,
        //     }}
        // setJobs([...jobs])
        await UrlPostApp(endpoints.spreadsheet_save, 'POST', body)
        await UrlPostApp(endpoints.spreadsheet_job, 'POST', bodyJob)
    }

    return {
        accounts,
        setAccounts,
        account,
        setAccount,
        jobs,
        nextJob,
        todayJobs,
        saveInfo,
        status,
        setStatus,
        loading
    }
}