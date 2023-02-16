
interface ImageItem {
    // The ID of the image
    id: string,
    // URL for the image's gallery
    gallery: string,
    // Link to this image
    src: string,
    // Link to an compressed & optimized version of this image
    srcSmall: string,
    // The prompt used to generate this image
    prompt: string,
    // Image dimensions
    width: number,
    height: number,
    // Seed
    seed: string,
    // Whether this image is a grid of multiple images
    grid: boolean,
    // The model used to generate this image
    model: string,
    // Guidance scale
    guidance: number,
    // The ID for this image's prompt
    promptid: string
    // Whether this image is classified as NSFW
    nsfw: boolean,
}

export interface ImageItems extends Array<ImageItem> { }

export const pkSystemState = {
    isFlippedCardOne: false,
    isFlippedCardTwo: false,
    searchQuery: '(8k, RAW photo, best quality, masterpiece:1.2), (realistic, photo-realistic:1.37),<lora:koreanDollLikeness_v10:0.5> <lora:stLouisLuxuriousWheels_v1:1>,st. louis \(luxurious wheels\) \(azur lane\),1girl,(Kpop idol), (aegyo sal:1),hair ornament, portrait, (long loose silver revealing dress:1.1), necklace, blue nails,cute,cityscape, night, rain, wet, professional lighting, photon mapping, radiosity, physically-based rendering, Negative prompt: EasyNegative, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans,extra fingers,fewer fingers, Size: 512x768, Seed: 839442842, Model: chilloutmix_NiPrunedFp32, Steps: 20, Sampler: DPM++ 2M Karras, CFG scale: 7, Model hash: 95afa0d9ea, Hires steps: 20, Hires upscale: 1.75, Hires upscaler: Latent (antialiased), Denoising strength: 0.5',
    images: Array<ImageItem>(),
};

export type PkSystemState = {
    isFlippedCardOne: boolean | undefined;
    isFlippedCardTwo: boolean | undefined;
    searchQuery: string;
    images: ImageItems;
};

