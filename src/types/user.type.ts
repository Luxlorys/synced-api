export interface User {
    data: {
        id: number;
        role: "ADMIN" | "PARTICIPANT";
    };
}
