const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index'); // Tu aplicación Express
const Paciente = require('../models/paciente');

// Mockear servicio externo
const sinon = require('sinon');
const { notificarPaciente } = require('../service/notifi.service.js');

describe('POST /guardarPaciente', () => {
    before(async () => {
        await Paciente.deleteMany({});
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Debe guardar un paciente correctamente', async () => {
        // Mock para notificarPaciente
        const notificarMock = sinon.stub(notificarPaciente, 'call').resolves('Notificación enviada');

        // Simulación de archivos
        const fotoBuffer = Buffer.from('foto-mock', 'utf-8');
        const certBuffer = Buffer.from('cert-mock', 'utf-8');

        const res = await request(app)
            .post('/guardarPaciente')
            .field('nom', 'Juan')
            .field('apeP', 'Pérez')
            .field('apeM', 'López')
            .field('calle', 'Principal')
            .field('no', '123')
            .field('col', 'Centro')
            .field('ciudad', 'Madrid')
            .field('cp', '28001')
            .field('numTelCa', '600123456')
            .field('numTelAsp', '600654321')
            .field('numTelMaPa', '600789012')
            .field('mail', 'juan@example.com')
            .attach('foto', fotoBuffer, 'foto.jpg')
            .attach('cert', certBuffer, 'cert.pdf');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.nom).to.equal('Juan');
        expect(res.body.foto.contentType).to.equal('image/jpeg');
        expect(notificarMock.called).to.be.true;
    });

    it('Debe devolver error si no se proporcionan archivos', async () => {
        const res = await request(app)
            .post('/guardarPaciente')
            .field('nom', 'Juan')
            .field('apeP', 'Pérez');

        expect(res.status).to.equal(400);
        expect(res.text).to.equal('No se proporcionaron los archivos');
    });
});