import Cookies from 'js-cookie';


export async function getUserTasks(email: string, pageNumber: number, statusFilter?: string, searchTerm?: string, categoryFilter?: string) {
    const token = Cookies.get('token');
    if (categoryFilter === 'all') {
        categoryFilter = '';

    }
    const response = await fetch(process.env.BACKEND_URL + `/get_tasks_by_user_email?email=${email}&page_number=${pageNumber}&filter=${statusFilter}&search_term=${searchTerm}&category_id=${categoryFilter}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

export async function getUserCategories(email: string) {
    const token = Cookies.get('token');
    const response = await fetch(process.env.BACKEND_URL + `/get_user_categories_by_email?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

export function useGetUserSession() {
    const session = Cookies.get('session');
    const user = session ? JSON.parse(session) : null;
    return user
}
