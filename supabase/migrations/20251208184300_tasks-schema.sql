DROP TABLE if EXISTS tasks;

create TABLE tasks (
    id BIGINT PRIMARY KEY generated always as identity NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT not null,
    status current_status default 'in-progress' not null,
    description text not null,
    due_date date default null,
    project_id BIGINT REFERENCES projects (id) DEFAULT NULL,
    collaborators text array DEFAULT array [] :: varchar [] not null
);
