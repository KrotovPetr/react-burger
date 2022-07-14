export const getColourType = (status: string): string => {
    if (status === 'done') return 'text_color_success';
    else return 'text_color_primary';
};
