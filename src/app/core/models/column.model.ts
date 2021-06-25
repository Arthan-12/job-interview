export interface Column<T> {
    name: keyof T;
    sortable?: boolean;
}