import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";

const createUserMock: User = {
    id: 1,
    first_name: "coder",
    last_name: "house",
    email: "ch@coder.com",
    password: "1234",
    avatar: "avatar"
}

const createUserDtoMock: CreateUserDto = {
    first_name: "coder",
    last_name: "house",
    email: "ch@coder.com",
    password: "1234",
    avatar: "avatar"
}

export { createUserMock, createUserDtoMock };
