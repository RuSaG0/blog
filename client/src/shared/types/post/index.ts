export interface IPost {
    content: string;
    created_at: Date;
    header: string;
    id: number;
    preview_url: Nullable<string>,
    tags: Nullable<string[]>
    updated_at: Date;
}