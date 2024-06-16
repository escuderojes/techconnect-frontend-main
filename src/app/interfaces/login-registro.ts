export interface Login {
    message:      string;
    user:         User;
    role:         string;
    access_token: string;
    token_type:   string;
    status:       number;
}

export interface User {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    role:              string;
    created_at:        Date;
    updated_at:        Date;
    roles:             Role[];
}

export interface Role {
    id:         number;
    name:       string;
    guard_name: string;
    created_at: Date;
    updated_at: Date;
    pivot:      Pivot;
}

export interface Pivot {
    model_type: string;
    model_id:   number;
    role_id:    number;
}