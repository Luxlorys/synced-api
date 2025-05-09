export interface User {
    data: {
        id: number;
        role: "Admin" | "Participant";
    };
}
