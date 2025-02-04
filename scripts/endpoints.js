const URL = process.env.EXPO_PUBLIC_API_URL
const SURL = process.env.EXPO_PUBLIC_SPREADSHEET_URL

const endpoints = {
    employees: (query) => `${URL}/employees?${query}`,
    jobs: (query) => `${URL}/jobs?${query}`,
    job: (id) => `${URL}/jobs/${id}`,
    job_schedule: (id) => `${URL}/jobs/${id}/schedule`,
    customer: (id) => `${URL}/customers/${id}`,
    appointments: (job, query) => `${URL}/jobs/${job}/appointments?${query}`,
    spreadsheet_save: `${SURL}/employee/test`,
    spreadsheet_job: `${SURL}/employee/save`,
    send_code: (email) => `${SURL}/email/send-code/${email}`,
    verify: `${SURL}/email/verify`,
}

export default endpoints