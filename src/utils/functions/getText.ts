export const getText = (status: string): string => {
    if (status === 'done') return 'Выполнен';
    else return 'В работе';
};
