import { expect } from 'chai';
import sinon from 'sinon';
import * as usersService from '../../src/services/users.service.js';

describe('Users service', () => {
    it('Debería retornar el usuario por email', async () => {
        const stubUser = {
            first_name: 'coder mock',
            last_name: 'house mock',
            email: 'ch-mock@gmail.com',
            password: '1234',
            role: 'admin'
        };

        const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(stubUser);

        const result = await usersService.getByEmail('test@test.com');

        console.log(result);

        expect(stub.calledOnce).to.be.true;
        stub.restore();
    })

    it('Debería lanzar una excepción cuando el usuario es null', async () => {
        const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(null);

        await usersService.getByEmail('test@test.com').catch((error) => {
            expect(error.message).to.eql('user not found');
        });

        stub.restore();
    })
})