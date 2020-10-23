import moment from 'moment';

export const getNombre = () => 
{
    let user = sessionStorage.getItem('nameUser');

    return user;
}

export const redirectNotUser = (history) => 
{
    let user = sessionStorage.getItem('nameUser');

    if(user)
    {
            
        history.push('/inicio')
    }
}

export const redirectNotUserLocal = (history) => 
{
    let user = sessionStorage.getItem('nameUser');

    if(!user)
    {
            
        history.push('/')
    }
}

export const getMonth = () => 
{
    return `${moment().subtract(0, "month").startOf("month").format('MMMM')}-${new Date().getFullYear()}`;
}