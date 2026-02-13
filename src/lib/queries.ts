const POKEMON_URL = import.meta.env.VITE_POKEMON_URL;
const APYHUB_URL = import.meta.env.VITE_APYHUB_URL;
const APY_TOKEN = import.meta.env.VITE_APY_TOKEN;
const UNI_DOMAIN_URL = import.meta.env.VITE_UNI_DOMAIN_URL;

export const getPokemon = (species: string) =>
  fetch(`${POKEMON_URL}/${species}`).then((res) => res.json());

export interface FileRequestBody {
  file: File | undefined;
  language: string;
}

export const postFile = (value: FileRequestBody) => {
  if (!value.file) {
    throw new Error("File is required");
  }
  const body = new FormData();
  body.append("file", value.file);
  body.append("language", value.language);

  return fetch(APYHUB_URL, {
    method: "POST",
    headers: {
      "apy-token": APY_TOKEN,
    },
    body,
  }).then((res) => res.json());
};

export const getUniversityList = async (country: string) => {
  const url = new URL(`${UNI_DOMAIN_URL}/search`);
  url.search = new URLSearchParams({
    country,
  }).toString();

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
