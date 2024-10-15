const unalib = require('../unalib/index'); // Asegúrate de que la ruta sea correcta
const assert = require('assert');

describe('unalib', function() {
    // Dentro de 'unalib', vamos a probar funciones específicas

    describe('función is_valid_phone', function() {
        it('debería devolver true para 8297-8547', function() {
            assert.equal(unalib.is_valid_phone('8297-8547'), true);
        });
    });

    describe('validación de URLs de imágenes', function() {
        it('debería devolver true para URL de imagen válida', function() {
            const url = 'https://example.com/image.jpg';
            assert.equal(unalib.is_valid_image_url(url), true);
        });

        it('debería devolver false para URL de imagen no válida', function() {
            const url = 'https://example.com/image.txt';
            assert.equal(unalib.is_valid_image_url(url), false);
        });
    });

    describe('validación de URLs de videos', function() {
        it('debería devolver true para URL de video válida', function() {
            const url = 'https://example.com/video.mp4';
            assert.equal(unalib.is_valid_video_url(url), true);
        });

        it('debería devolver false para URL de video no válida', function() {
            const url = 'https://example.com/video.jpg';
            assert.equal(unalib.is_valid_video_url(url), false);
        });
    });

    describe('prevención de inyección de scripts', function() {
        it('debería eliminar scripts maliciosos del mensaje', function() {
            const mensajeMalicioso = '<script>alert("malicioso")</script>';
            const resultado = unalib.validateMessage(JSON.stringify({ mensaje: mensajeMalicioso }));
            const objResultado = JSON.parse(resultado);
            assert.equal(objResultado.mensaje, ''); // El mensaje debería estar vacío después de sanitizar
        });

        it('debería permitir texto limpio', function() {
            const mensajeLimpio = 'Este es un mensaje normal.';
            const resultado = unalib.validateMessage(JSON.stringify({ mensaje: mensajeLimpio }));
            const objResultado = JSON.parse(resultado);
            assert.equal(objResultado.mensaje, mensajeLimpio); // El mensaje debería permanecer igual
        });
    });
});
