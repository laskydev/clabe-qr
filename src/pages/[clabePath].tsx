import {users} from "../../data/data";
import type {User} from "../../data/data";
import type {GetStaticPropsContext} from "next";
import {BiCopy} from "react-icons/bi";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast, ToastContainer} from "react-toastify";
import Image from "next/image";
import {BsWhatsapp} from "react-icons/bs";
import {Container} from "~/components/Container";

export function getStaticPaths() {
    const paths = users.map((_user) => {
        return {
            params: {
                clabePath: _user.path,
            },
        };
    });
    console.log(paths);
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    };
}

// `getStaticPaths` requires using `getStaticProps`
export function getStaticProps(context: GetStaticPropsContext) {
    const dataUser = users.find((user) => user.path === context?.params?.clabePath);
    return {
        // Passed to the page component as props
        props: {
            dataUser,
        },
    };
}

function shorten(text: string, textLength = 17) {
    if (text.length > textLength) {
        text = text.substring(0, textLength) + "...  ";
    }
    return text;
}

export default function Post({dataUser}: { dataUser: User }) {
    const notify = (message: string) => toast(message);
    return (
        <>
            <h1 className="mt-[10%] text-center text-3xl text-white">
                {dataUser?.name}
            </h1>
            <Image
                src="/transfer-icon-1.png"
                alt=""
                width={100}
                height={100}
                className="mx-auto my-2"
            />
            <Container>
                {/*CLABE INTERBANCARIA*/}
                <p className="text-center font-semibold">CLABE Interbancaria:</p>

                <div
                    className="relative mx-auto mt-1 flex w-fit items-center gap-1 rounded-xl transition active:scale-95 active:outline ">
                    <p className="mx-auto flex w-fit items-center gap-2 rounded-xl bg-blue-500 py-3 px-4 text-center text-white ">
                        {dataUser?.clabe}{" "}
                        <CopyToClipboard
                            text={dataUser?.clabe}
                            onCopy={() =>
                                notify(
                                    `Nombre de la cuenta copiado correctamente: ${dataUser.clabe}`
                                )
                            }
                        >
                            <button className="-right-12 flex  flex-col items-center justify-center">
                                <BiCopy width={30}/>
                                <p className="text-xs">Copiar</p>
                            </button>
                        </CopyToClipboard>
                    </p>
                </div>

                {/* NOMBRE DE LA CUENTA*/}
                <p className="mt-5 text-center font-semibold">Nombre de la cuenta:</p>
                <div
                    className="relative mx-auto mt-1 flex w-fit items-center gap-1 rounded-xl transition active:scale-95 active:outline">
                    <p className="mx-auto flex w-fit items-center gap-2 rounded-xl bg-blue-500 py-3 px-4 text-center text-white">
                        {shorten(dataUser?.nombre_de_la_cuenta)}{" "}
                        <CopyToClipboard
                            text={dataUser?.nombre_de_la_cuenta}
                            onCopy={() =>
                                notify(
                                    `Nombre de la cuenta copiado correctamente: ${dataUser.nombre_de_la_cuenta}`
                                )
                            }
                        >
                            <button className="ml-1 flex flex-col items-center justify-center">
                                <BiCopy width={30}/>
                                <p className="text-xs">Copiar</p>
                            </button>
                        </CopyToClipboard>
                    </p>
                </div>
                {/* BANCO */}
                <p className="mt-3 text-center font-semibold ">Banco:</p>

                <div className="flex items-center justify-center">
                    <div>
                        <div className="mx-auto  flex w-fit items-center gap-1">
                            <p className="mx-auto flex w-fit items-center gap-2 rounded-xl bg-blue-500 py-2 px-4 text-center text-white">
                                {dataUser?.banco}{" "}
                            </p>
                        </div>
                    </div>
                </div>

                {/*WHATSAPP CONTAINER*/}

                <a
                    href={`https://api.whatsapp.com/send?phone=${dataUser.whatsapp}&text=Hola%20vengo%20de%20ClabeQR%20y%20este%20es%20mi%20comprobante!`}
                    target="_blank"
                    className="mt-4 justify-center flex items-center gap-3 rounded-xl bg-green-600 px-3 py-4 text-sm text-white outline-black transition active:scale-95 active:outline"
                >
                    Enviar Whatsapp <BsWhatsapp width={20}/>
                </a>
            </Container>

            <p className="absolute bottom-5 w-full text-center text-xs text-white">
                ClabeQR ® {new Date().getFullYear()}
            </p>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}
