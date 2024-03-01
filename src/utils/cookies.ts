import cookie from 'js-cookie'

export const processEnv = {
    name: process.env.COOKIE_NAME || "SESSION",
    rol: process.env.COOKIE_ROL || "ROLESESSION",
    jtIdentity: process.env.NEXT_PUBLIC_JTIdentity || "jtIdentity"
}

export const setCookie = (name: string, value: string, options: any = {}) => {
    return new Promise((res, rej) => {
        try {
            const cookieSerial = cookie.set(name, value, options);
            res(cookieSerial);
        } catch (error) {
            rej(error);
        }
    })
}

export const getCookie = (name: string) => {
    return new Promise((res, rej) => {
        const cookieSerial = cookie.get(name);
        // @ts-ignore
        if (cookieSerial != undefined) {
            res(cookieSerial);
        } else {
            rej("error");
        }
    })
}

export const deleteCookie = (name: string) => {
    return new Promise((res, rej) => {
        try {
            const cookieSerial = cookie.remove(name);
            // @ts-ignore
            res(cookieSerial);
        } catch (error) {
            rej(error);
        }
    })
}