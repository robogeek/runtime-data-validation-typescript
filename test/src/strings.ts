
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, matches, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    ValidateParams, ValidateAccessor, IsByteLength,
    IsEmpty, IsFullWidth, IsHalfWidth, IsIn, IsJSON,
    IsLength, IsLowercase
} from 'runtime-data-validation';

describe('Contains', function() {

    class ContainsExample {

        #title: string;

        @ValidateAccessor<string>()
        @Contains('world')
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateParams
        echo(
            @Contains('world')
            message: string) {
            return message;
        }
    }

    const ce = new ContainsExample();

    it('Should contain string', function() {
        ce.title = 'Maggies world';
        assert.equal(ce.title, 'Maggies world');
    });

    it('Should fail on bad string', function() {
        let failed = false;
        try {
            ce.title = 'Gillagans Wake';
            assert.equal(ce.title, 'Gillagans Wake');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    it('Should echo good param', function() {
        const msg = 'Reiki world';
        const result = ce.echo(msg);
        assert.equal(result, msg);
    });

    it('Should fail on bad parameter', function() {
        let failed = false;
        try {
            const msg = 'Reiki World';
            const result = ce.echo(msg);
            assert.equal(result, msg);
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });
});

describe('Equals', function() {
    class EqualsExample {

        #title: string;

        @ValidateAccessor<string>()
        @Equals('world')
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateParams
        echo(
            @Equals('world')
            message: string) {
            return message;
        }
    }

    const ee2 = new EqualsExample();

    it('Should equal', function() {
        ee2.title = 'world';
        assert.equal(ee2.title, 'world');
    });

    it('Should fail not equal', function() {
        let failed = false;
        try {
            ee2.title = 'World';
            assert.equal(ee2.title, 'World');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    it('Should echo good param', function() {
        const msg = 'world';
        const result = ee2.echo(msg);
        assert.equal(result, msg);
    });

    it('Should fail on bad parameter', function() {
        let failed = false;
        try {
            const msg = 'World';
            const result = ee2.echo(msg);
            assert.equal(result, msg);
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });
});


describe('Matches', function() {
    class MatchesExample {

        #title: string;

        @ValidateAccessor<string>()
        @matches(/^[a-zA-Z0-9 ]+$/)
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateParams
        echo(
            @matches(/^[a-zA-Z0-9 ]+$/)
            message: string) {
            return message;
        }
    }

    const ee2 = new MatchesExample();


    it('Should match on accessor', function() {
        ee2.title = 'world';
        assert.equal(ee2.title, 'world');

        ee2.title = 'Hello world';
        assert.equal(ee2.title, 'Hello world');
        
        ee2.title = '42 is meaning of life';
        assert.equal(ee2.title, '42 is meaning of life');
    });

    it('Should match on method params', function() {
        let msg = 'world';
        let result = ee2.echo(msg);
        assert.equal(result, msg);

        msg = 'Hello world';
        result = ee2.echo(msg);
        assert.equal(result, msg);

        msg = '42 is meaning of life';
        result = ee2.echo(msg);
        assert.equal(result, msg);
    });

    it('Should reject invalid accessors', function() {
        let failed = false;
        try {
            ee2.title = 'World!';
            assert.equal(ee2.title, 'World!');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ee2.title = '@World!';
            assert.equal(ee2.title, '@World!');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    it('Should reject invalid method parameters', function() {
        let failed = false;
        try {
            const msg = 'Hello World!';
            const result = ee2.echo(msg);
            assert.equal(result, msg);

        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const msg = 'Hello @World!';
            const result = ee2.echo(msg);
            assert.equal(result, msg);
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

});

describe('IsAlpha - IsAlphanumeric - IsAscii - IsFullWidth - IsHalfWidth - IsLowercase', function() {

    class AlphaExample {

        #title: string;

        @ValidateAccessor<string>()
        @IsAlpha()
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateAccessor<string>()
        @IsFullWidth()
        set titleFULL(nt: string) { this.#title = nt; }
        get titleFULL() { return this.#title; }

        @ValidateAccessor<string>()
        @IsHalfWidth()
        set titleHALF(nt: string) { this.#title = nt; }
        get titleHALF() { return this.#title; }

        #license: string;

        @ValidateAccessor<string>()
        @IsAlphanumeric()
        set license(nt: string) { this.#license = nt; }
        get license() { return this.#license; }

        @ValidateParams
        titlense(
            @IsAlpha()        newtitle: string,
            @IsAlphanumeric() newlicense: string
        ) {
            this.title = newtitle;
            this.license = newlicense;
        }

        @ValidateParams
        checkAscii(
            @IsAscii() checkThis: string
        ) {
            return checkThis;
        }

        @ValidateParams
        checkFullWidth(
            @IsFullWidth() checkThis: string
        ) {
            return checkThis;
        }

        @ValidateParams
        checkHalfWidth(
            @IsHalfWidth() checkThis: string
        ) {
            return checkThis;
        }

        #lower: string;

        @ValidateAccessor<string>()
        @IsLowercase()
        set lower(nt: string) { this.#lower = nt; }
        get lower() { return this.#lower; }

        @ValidateParams
        checkLowerCase(
            @IsLowercase() checkThis: string
        ) {
            return checkThis;
        }

    }

    const ae = new AlphaExample();

    it('Should validate lower case', function() {
        ae.lower = 'abc';
        assert.equal(ae.lower, 'abc');
        ae.lower = 'abc123';
        assert.equal(ae.lower, 'abc123');
        ae.lower = 'tr竪s 端ber';
        assert.equal(ae.lower, 'tr竪s 端ber');

        assert.equal(ae.checkLowerCase('abc'), 'abc');
        assert.equal(ae.checkLowerCase('abc123'), 'abc123');
        assert.equal(ae.checkLowerCase('tr竪s 端ber'), 'tr竪s 端ber');
    });

    it('Should reject non-lower case', function() {
        let failed = false;
        try {
            ae.lower = 'fooBar';
            assert.equal(ae.lower, 'fooBar');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            assert.equal(ae.checkLowerCase('fooBar'), 'fooBar');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.lower = '123A';
            assert.equal(ae.lower, '123A');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            assert.equal(ae.checkLowerCase('123A'), '123A');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

    });

    it('Should set values', function() {
        ae.title = 'GilligansWake';
        assert.equal(ae.title, 'GilligansWake');

        ae.license = '4HDR298';
        assert.equal(ae.license, '4HDR298');

        ae.titlense('BoatWake', 'UBUYGAS1');
        assert.equal(ae.title, 'BoatWake');
        assert.equal(ae.license, 'UBUYGAS1');
    });

    it('Should fail for bad values', function() {
        let failed = false;
        try {
            ae.title = 'Words with Spaces';
            assert.equal(ae.title, 'Words with Spaces');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.license = 'Words with Spaces1234';
            assert.equal(ae.license, 'Words with Spaces1234');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.titlense('Boat Wake', 'UBUYGAS1');
            assert.equal(ae.title, 'Boat Wake');
            assert.equal(ae.license, 'UBUYGAS1');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.titlense('BoatWake', 'U-BUY-GAS-1');
            assert.equal(ae.title, 'BoatWake');
            assert.equal(ae.license, 'U-BUY-GAS-1');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('should validate correct ASCII strings', function() {
        const valid = [
            'foobar',
            '0987654321',
            'test@example.com',
            '1234abcDEF',
        ];
        for (const v of valid) {
            const result = ae.checkAscii(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('should reject non-ASCII strings', function() {
        const invalid = [
            'ｆｏｏbar',
            'ｘｙｚ０９８',
            '１２３456',
            'ｶﾀｶﾅ',
        ];
        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ae.checkAscii(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validFULL = [
        'ひらがな・カタカナ、．漢字',
        '３ー０　ａ＠ｃｏｍ',
        'Ｆｶﾀｶﾅﾞﾬ',
        'Good＝Parts',
    ];
    const invalidFULL = [
        'abc',
        'abc123',
        '!"#$%&()<>/+=-_? ~^|.,@`{}[]',
    ];

    it('should validate correct FullWidth strings', function() {
        for (const v of validFULL) {
            ae.titleFULL = v;
            assert.equal(ae.titleFULL, v);

            const result = ae.checkFullWidth(v);
            assert.equal(v, result);
        }
    });

    it('should reject non-FullWidth strings', function() {
        for (const iv of invalidFULL) {

            let failed = false;
            try {
                ae.titleFULL = iv;
                assert.equal(ae.titleFULL, iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);

            failed = false;
            try {
                const result = ae.checkFullWidth(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validHALF = [
        '!"#$%&()<>/+=-_? ~^|.,@`{}[]',
        'l-btn_02--active',
        'abc123い',
        'ｶﾀｶﾅﾞﾬ￩',
    ];
    const invalidHALF = [
        'あいうえお',
        '００１１',
    ];

    it('should validate correct HalfWidth strings', function() {
        for (const v of validHALF) {
            ae.titleHALF = v;
            assert.equal(ae.titleHALF, v);

            const result = ae.checkHalfWidth(v);
            assert.equal(v, result);
        }
    });

    it('should reject non-HalfWidth strings', function() {
        for (const iv of invalidHALF) {

            let failed = false;
            try {
                ae.titleHALF = iv;
                assert.equal(ae.titleHALF, iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);

            failed = false;
            try {
                const result = ae.checkHalfWidth(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('BASE32 - BASE58', function() {

    class BaseEncoded {

        @ValidateParams
        checkBase64urlSafe(
            @IsBase64({ urlSafe: true }) checked: string
        ) {
            return checked;
        }

        @ValidateParams
        checkBase64(
            @IsBase64() checked: string
        ) {
            return checked;
        }

        @ValidateParams
        checkBase58(
            @IsBase58() checked: string
        ) {
            return checked;
        }

        @ValidateParams
        checkBase32(
            @IsBase32() checked: string
        ) {
            return checked;
        }
    }

    const be = new BaseEncoded();

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE32 strings', function() {
        const valid = [
            'ZG======',
            'JBSQ====',
            'JBSWY===',
            'JBSWY3A=',
            'JBSWY3DP',
            'JBSWY3DPEA======',
            'K5SWYY3PNVSSA5DPEBXG6ZA=',
            'K5SWYY3PNVSSA5DPEBXG6===',
        ];


        for (const v of valid) {
            const result = be.checkBase32(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should reject invalid BASE32 strings', function() {
        const invalid = [
            '12345',
            '',
            'JBSWY3DPtesting123',
            'ZG=====',
            'Z======',
            'Zm=8JBSWY3DP',
            '=m9vYg==',
            'Zm9vYm/y====',
        ];

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = be.checkBase32(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE58 strings', function() {
        const valid = [
            'BukQL',
            '3KMUV89zab',
            '91GHkLMNtyo98',
            'YyjKm3H',
            'Mkhss145TRFg',
            '7678765677',
            'abcodpq',
            'AAVHJKLPY',
        ];


        for (const v of valid) {
            const result = be.checkBase58(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should reject invalid BASE58 strings', function() {
        const invalid = [
            '0OPLJH',
            'IMKLP23',
            'KLMOmk986',
            'LL1l1985hG',
            '*MP9K',
            'Zm=8JBSWY3DP',
            ')()(=9292929MKL',
        ];

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = be.checkBase58(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE64 strings', function() {
        const valid = [
            '',
            'Zg==',
            'Zm8=',
            'Zm9v',
            'Zm9vYg==',
            'Zm9vYmE=',
            'Zm9vYmFy',
            'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=',
            'Vml2YW11cyBmZXJtZW50dW0gc2VtcGVyIHBvcnRhLg==',
            'U3VzcGVuZGlzc2UgbGVjdHVzIGxlbw==',
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuMPNS1Ufof9EW/M98FNw' +
            'UAKrwflsqVxaxQjBQnHQmiI7Vac40t8x7pIb8gLGV6wL7sBTJiPovJ0V7y7oc0Ye' +
            'rhKh0Rm4skP2z/jHwwZICgGzBvA0rH8xlhUiTvcwDCJ0kc+fh35hNt8srZQM4619' +
            'FTgB66Xmp4EtVyhpQV+t02g6NzK72oZI0vnAvqhpkxLeLiMCyrI416wHm5Tkukhx' +
            'QmcL2a6hNOyu0ixX/x2kSFXApEnVrJ+/IxGyfyw8kf4N2IZpW5nEP847lpfj0SZZ' +
            'Fwrd1mnfnDbYohX2zRptLy2ZUn06Qo9pkG5ntvFEPo9bfZeULtjYzIl6K8gJ2uGZ' +
            'HQIDAQAB',
        ];


        for (const v of valid) {
            const result = be.checkBase64(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should reject invalid BASE64 strings', function() {
        const invalid = [
            '12345',
            'Vml2YW11cyBmZXJtZtesting123',
            'Zg=',
            'Z===',
            'Zm=8',
            '=m9vYg==',
            'Zm9vYmFy====',
        ];

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = be.checkBase64(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE64 URLSAFE strings', function() {
        const valid = [
            '',
            'bGFkaWVzIGFuZCBnZW50bGVtZW4sIHdlIGFyZSBmbG9hdGluZyBpbiBzcGFjZQ',
            '1234',
            'bXVtLW5ldmVyLXByb3Vk',
            'PDw_Pz8-Pg',
            'VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw'
        ];


        for (const v of valid) {
            const result = be.checkBase64urlSafe(v,);
            assert.equal(v, result);
        }
    });

});

describe('String size', function() {

    class StringSizeExample {
        #byteLength: string;

        @ValidateAccessor<string>()
        @IsByteLength({ min: 2, max: undefined })
        set byteLengthMin2(ns: string) { this.#byteLength = ns; }
        get byteLengthMin2() { return this.#byteLength; }

        @ValidateAccessor<string>()
        @IsByteLength({ min: 2, max: 3 })
        set byteLengthMin2Max3(ns: string) { this.#byteLength = ns; }
        get byteLengthMin2Max3() { return this.#byteLength; }

        @ValidateAccessor<string>()
        @IsByteLength({ min: 0, max: 0 })
        set byteLength00(ns: string) { this.#byteLength = ns; }
        get byteLength00() { return this.#byteLength; }

        @ValidateParams
        checkByteLengthMin2(
            @IsByteLength({ min: 2, max: undefined })
            ns: string
        ) {
            return ns;
        }

        @ValidateParams
        checkByteLengthMin2Max3(
            @IsByteLength({ min: 2, max: 3 })
            ns: string
        ) {
            return ns;
        }

        @ValidateParams
        checkByteLength00(
            @IsByteLength({ min: 0, max: 0 })
            ns: string
        ) {
            return ns;
        }

        #isempty: string;

        @ValidateAccessor<string>()
        @IsEmpty()
        set isempty(ns: string) { this.#isempty = ns; }
        get isempty() { return this.#isempty; }

        @ValidateAccessor<string>()
        @IsEmpty({ ignore_whitespace: false })
        set isemptyIWH(ns: string) { this.#isempty = ns; }
        get isemptyIWH() { return this.#isempty; }

        @ValidateAccessor<string>()
        @IsEmpty({ ignore_whitespace: true })
        set isemptyAWH(ns: string) { this.#isempty = ns; }
        get isemptyAWH() { return this.#isempty; }

        @ValidateParams
        checkIsEmpty(
            @IsEmpty() ns: string
        ) {
            return ns;
        }

        @ValidateParams
        checkIsEmptyIWH(
            @IsEmpty({ ignore_whitespace: false })
            ns: string
        ) {
            return ns;
        }

        @ValidateParams
        checkIsEmptyAWH(
            @IsEmpty({ ignore_whitespace: true })
            ns: string
        ) {
            return ns;
        }

        #length: string;
        #length2: string;
        #length2_3: string;
        #length_3: string;
        #length_0: string;

        @ValidateAccessor<string>()
        @IsLength()
        set length(ns: string) { this.#length = ns; }
        get length() { return this.#length; }

        @ValidateParams
        checkLength(
            @IsLength() ns: string
        ) {
            return ns;
        }

        @ValidateAccessor<string>()
        @IsLength({ min: 2 })
        set length2(ns: string) { this.#length2 = ns; }
        get length2() { return this.#length2; }

        @ValidateParams
        checkLength_2(
            @IsLength({ min: 2 }) ns: string
        ) {
            return ns;
        }

        @ValidateAccessor<string>()
        @IsLength({ min: 2, max: 3 })
        set length2_3(ns: string) { this.#length2_3 = ns; }
        get length2_3() { return this.#length2_3; }

        @ValidateParams
        checkLength_2_3(
            @IsLength({ min: 2, max: 3 }) ns: string
        ) {
            return ns;
        }

        @ValidateAccessor<string>()
        @IsLength({ max: 3 })
        set length_3(ns: string) { this.#length_3 = ns; }
        get length_3() { return this.#length_3; }

        @ValidateParams
        checkLength__3(
            @IsLength({ max: 3 }) ns: string
        ) {
            return ns;
        }

        @ValidateAccessor<string>()
        @IsLength({ max: 0 })
        set length_0(ns: string) { this.#length_0 = ns; }
        get length_0() { return this.#length_0; }

        @ValidateParams
        checkLength__0(
            @IsLength({ max: 0 }) ns: string
        ) {
            return ns;
        }

    }
    
    const sse = new StringSizeExample();

    it('Should validate length ANY', function() {
        for (const v of [ 'a', '', 'asds' ]) {
            sse.length = v;
            assert.equal(v, sse.length);
            const result = sse.checkLength(v);
            assert.equal(v, result);
        }
    });

    it('Should validate length min 2', function() {
        for (const v of ['abc', 'de', 'abcd']) {
            sse.length2 = v;
            assert.equal(v, sse.length2);
            const result = sse.checkLength_2(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid length min 2', function() {
        for (const iv of ['', 'a']) {

            let failed = false;
            try {
                sse.length2 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);

            failed = false;
            try {
                const result = sse.checkLength_2(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should validate length min 2 max 3', function() {
        for (const v of ['abc', 'de']) {
            sse.length2_3 = v;
            assert.equal(v, sse.length2_3);
            const result = sse.checkLength_2_3(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid length min 2 max 3', function() {
        for (const iv of ['', 'a', 'abcd']) {

            let failed = false;
            try {
                sse.length2_3 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);

            failed = false;
            try {
                const result = sse.checkLength_2_3(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should validate length max 3', function() {
        for (const v of ['abc', 'de', 'a', '']) {
            sse.length_3 = v;
            assert.equal(v, sse.length_3);
            const result = sse.checkLength__3(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid length max 3', function() {
        for (const iv of ['abcd']) {

            let failed = false;
            try {
                sse.length_3 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);

            failed = false;
            try {
                const result = sse.checkLength__3(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should validate length max 0', function() {
        for (const v of ['']) {
            sse.length_0 = v;
            assert.equal(v, sse.length_0);
            const result = sse.checkLength__0(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid length max 0', function() {
        for (const iv of ['a', 'ab']) {

            let failed = false;
            try {
                sse.length_0 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);

            failed = false;
            try {
                const result = sse.checkLength__0(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    const validMin2   = ['abc', 'de', 'abcd', 'ｇｍａｉｌ'];
    const invalidMin2 = ['', 'a'];
    const validMin2Max3 = ['abc', 'de', 'ｇ'];
    const invalidMin2Max3 = ['', 'a', 'abcd', 'ｇｍ'];
    const valid00 = [''];
    const invalid00 = ['ｇ', 'a'];

    it('Should validate accessors min 2', function() {
        for (const v of validMin2) {
            sse.byteLengthMin2 = v;
            assert.equal(v, sse.byteLengthMin2);
        }
    });

    it('Should validate parameters min 2', function() {
        for (const v of validMin2) {
            const result = sse.checkByteLengthMin2(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid accessors min2', function() {
        for (const iv of invalidMin2) {
            let failed = false;
            try {
                sse.byteLengthMin2 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should reject invalid parameters min2', function() {
        for (const iv of invalidMin2) {
            let failed = false;
            try {
                sse.checkByteLengthMin2(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });


    it('Should validate accessors min 2 max 3', function() {
        for (const v of validMin2Max3) {
            sse.byteLengthMin2Max3 = v;
            assert.equal(v, sse.byteLengthMin2Max3);
        }
    });

    it('Should validate parameters min 2 max3', function() {
        for (const v of validMin2Max3) {
            const result = sse.checkByteLengthMin2Max3(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid accessors min 2 max 3', function() {
        for (const iv of invalidMin2Max3) {
            let failed = false;
            try {
                sse.byteLengthMin2Max3 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should reject invalid parameters min 2 max 3', function() {
        for (const iv of invalidMin2Max3) {
            let failed = false;
            try {
                sse.checkByteLengthMin2Max3(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });




    it('Should validate accessors min 0 max 0', function() {
        for (const v of valid00) {
            sse.byteLength00 = v;
            assert.equal(v, sse.byteLength00);
        }
    });

    it('Should validate parameters min 0 max 0', function() {
        for (const v of valid00) {
            const result = sse.checkByteLength00(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid accessors min 0 max 0', function() {
        for (const iv of invalid00) {
            let failed = false;
            try {
                sse.byteLength00 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should reject invalid parameters min 0 max 0', function() {
        for (const iv of invalid00) {
            let failed = false;
            try {
                sse.checkByteLength00(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should validate empty strings', function() {
        sse.isempty = '';
        assert.equal(sse.isempty, '');

        const result = sse.checkIsEmpty('');
        assert.equal(result, '');
    });

    it('Should reject non-empty strings', function() {
        let failed = false;
        try {
            sse.isempty = ' ';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            sse.isempty = 'foo';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            sse.isempty = '333';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmpty(' ');
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmpty('foo');
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmpty('333');
        } catch(e) { failed = true; }
        assert.equal(failed, true);
        
    });

    it('Should validate empty strings ignore_whitespace: false', function() {
        sse.isemptyIWH = '';
        assert.equal(sse.isemptyIWH, '');

        const result = sse.checkIsEmptyIWH('');
        assert.equal(result, '');
    });

    it('Should reject non-empty strings ignore_whitespace: false', function() {
        let failed = false;
        try {
            sse.isemptyIWH = ' ';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            sse.isemptyIWH = 'foo';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            sse.isemptyIWH = '333';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmptyIWH(' ');
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmptyIWH('foo');
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmptyIWH('333');
        } catch(e) { failed = true; }
        assert.equal(failed, true);
        
    });


    it('Should validate empty strings ignore_whitespace: true', function() {
        sse.isemptyAWH = '';
        assert.equal(sse.isemptyAWH, '');
        sse.isemptyAWH = ' ';
        assert.equal(sse.isemptyAWH, ' ');

        let result = sse.checkIsEmptyAWH('');
        assert.equal(result, '');
        result = sse.checkIsEmptyAWH(' ');
        assert.equal(result, ' ');
    });


    it('Should reject non-empty strings ignore_whitespace: true', function() {

        let failed = false;
        try {
            sse.isemptyAWH = 'foo';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            sse.isemptyAWH = '333';
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmptyAWH('foo');
        } catch(e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            const result = sse.checkIsEmptyAWH('333');
        } catch(e) { failed = true; }
        assert.equal(failed, true);
        
    });

});

describe('IsIn', function() {

    class IsInExample {

        #value: string;

        @ValidateAccessor<string>()
        @IsIn([ 'valid', 'values', 'allowed', 'in', 'this', 'example' ])
        set value(nv: string) { this.#value = nv; }
        get value() { return this.#value; }

        @ValidateParams
        checkValue(
            @IsIn([ 'valid', 'values', 'allowed', 'in', 'this', 'example' ])
            val: string
        ) {
            return val;
        }
    }

    const iie = new IsInExample();

    it('Should recognize values in allowed', function() {
        for (const v of [ 'valid', 'values', 'allowed', 'in', 'this', 'example' ]) {

            iie.value = v;
            assert.equal(v, iie.value);

            const result = iie.checkValue(v);
            assert.equal(result, v);
        }
    });

    it('Should reject non-allowed values', function() {
        for (const iv of [ 'notallowed', 'notvalid', 'valueless' ]) {
            let failed = false;
            try {
                iie.value = iv;
                assert.equal(iv, iie.value);
            } catch (e) { failed = true; }
            assert.equal(failed, true);

            failed = false;
            try {
                const result = iie.checkValue(iv);
                assert.equal(result, iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
});

describe('JSON', function() {

    class JSONExample {

        #json: string;

        @ValidateAccessor<string>()
        @IsJSON()
        set json(nv: string) { this.#json = nv; }
        get json() { return this.#json; }

        @ValidateParams
        checkJSON(
            @IsJSON() val: string
        ) {
            return val;
        }

        #jsonPrimitive: string;

        @ValidateAccessor<string>()
        @IsJSON({ allow_primitives: true })
        set jsonPrimitive(nv: string) { this.#jsonPrimitive = nv; }
        get jsonPrimitive() { return this.#jsonPrimitive; }

        @ValidateParams
        checkJSONPrimitive(
            @IsJSON({ allow_primitives: true }) val: string
        ) {
            return val;
        }
    }

    const json = new JSONExample();
    
    const valid = [
        '{ "key": "value" }',
        '{}',
    ];
    const invalid = [
        '{ key: "value" }',
        '{ \'key\': \'value\' }',
        'null',
        '1234',
        '"nope"',
    ];

    it('should validate correct JSON accessors', function() {
        for (const v of valid) {
            json.json = v;
            assert.equal(v, json.json);
        }
    });

    it('should validate correct JSON parameters', function() {
        for (const v of valid) {
            const result = json.checkJSON(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid JSON accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                json.json = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid JSON parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = json.checkJSON(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validP = [
        '{ "key": "value" }',
        '{}',
        'null',
        'false',
        'true',
    ];
    const invalidP = [
        '{ key: "value" }',
        '{ \'key\': \'value\' }',
        '{ "key": value }',
        '1234',
        '"nope"',
    ];

    it('should validate correct JSON Primitive accessors', function() {
        for (const v of validP) {
            json.jsonPrimitive = v;
            assert.equal(v, json.jsonPrimitive);
        }
    });

    it('should validate correct JSON Primitive parameters', function() {
        for (const v of validP) {
            const result = json.checkJSONPrimitive(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid JSON Primitive accessors', function() {

        for (const iv of invalidP) {
            let failed = false;
            try {
                json.jsonPrimitive = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid JSON Primitive parameters', function() {

        for (const iv of invalidP) {
            let failed = false;
            try {
                const result = json.checkJSONPrimitive(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});
