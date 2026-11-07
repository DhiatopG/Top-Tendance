import { FeaturableWidgetData } from '@/types/review';

const WIDGET_ID = '94267520-354f-4c2a-9087-ebddd8fb8323';
const API_URL = `https://api.featurable.com/v1/widgets/${WIDGET_ID}`;

// Safe offline / fallback reviews matching actual Google reviews data
export const FALLBACK_REVIEWS: FeaturableWidgetData = {
  success: true,
  widget: WIDGET_ID,
  averageRating: 4.9,
  totalReviewCount: 8,
  profileUrl: 'https://search.google.com/local/writereview?placeid=ChIJS2uvYgAz_RIR2CCuMW4M3YQ',
  reviews: [
    {
      reviewId: 'fallback-1',
      reviewer: {
        displayName: 'Shayma Khelifi',
        profilePhotoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjXuosvfsipX8EdsRfmCLPzNXuVTGj6EpiWhhwW78e-ekWvrxnw=s120-c-rp-mo-br100',
      },
      starRating: 5,
      comment: 'Wow nice quality 💜✨',
      createTime: '2026-11-02T19:34:02.681857Z',
      reviewReply: {
        comment: 'Merci Shayma, votre “wow” me fait super plaisir ! Ravie que la qualité vous ait plu. Belle journée à vous !',
        updateTime: '2026-11-02T22:47:21.249834Z',
      },
    },
    {
      reviewId: 'fallback-2',
      reviewer: {
        displayName: 'Rania Radhouene',
        profilePhotoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocJZm4bBz-yrlq3ZB-qo0-3w55onAPQ7Ywxqeh7Lwym5jdg_GA=s120-c-rp-mo-br100',
      },
      starRating: 5,
      comment: 'Top qualité services professionnels',
      createTime: '2026-11-01T16:30:12.612098Z',
      reviewReply: {
        comment: 'Merci Rania pour ce retour ! Qualité et professionnalisme, c’est ce que j’essaie d’offrir à chaque cliente. Ravie que ça vous ait plu. À bientôt chez Top Tendance !',
        updateTime: '2026-11-01T22:04:24.275444Z',
      },
    },
    {
      reviewId: 'fallback-3',
      reviewer: {
        displayName: 'Gafsi Mariem',
        profilePhotoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocJ41U_AWbNePg9MO7OB3xp6AZpPU_2RGFOlPCiSEFpC0IRVjw=s120-c-rp-mo-br100',
      },
      starRating: 5,
      comment: 'Top qualité merci beaucoup rabaa',
      createTime: '2026-10-31T08:41:04.946979Z',
      reviewReply: {
        comment: 'Merci Mariem pour ce super message, il me va droit au cœur ! Savoir que la qualité vous a plu, c’est la plus belle récompense pour moi. Vous êtes toujours la bienvenue chez Top Tendance.',
        updateTime: '2026-10-31T21:27:21.448255Z',
      },
    },
    {
      reviewId: 'fallback-4',
      reviewer: {
        displayName: 'Intissar Mhadhbi',
        profilePhotoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocI8T4GDLxCYWfczufc_8qwAcvCHhgKtQwuNHyNy8Ak69Zsg0Q=s120-c-rp-mo-br100',
      },
      starRating: 5,
      comment: 'Top service and top quality! I recently visited Top Tendance in Ariana and had a wonderful experience from start to finish. A special thank you to Rabaa, who welcomed me with a big smile and made me feel comfortable right away. The quality of the clothes really impressed me.',
      createTime: '2026-10-17T18:03:40.261552Z',
      reviewReply: {
        comment: 'Intissar, quel beau message, merci du fond du cœur ! Ça me touche beaucoup que vous ayez senti qu’on a pris le temps de vous écouter. Je suis ravie que la qualité et les modèles vous aient plu.',
        updateTime: '2026-10-31T21:39:04.182640Z',
      },
    },
    {
      reviewId: 'fallback-5',
      reviewer: {
        displayName: 'Emna Emna',
        profilePhotoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocK48VEeCM2QbsOMkfpXxQtuM0OzfTI_ILDBncYC0DiX66m9jQ=s120-c-rp-mo-br100',
      },
      starRating: 5,
      comment: 'I recently visited this store and was thoroughly impressed by the level of service I received. The associate who helped me was not only knowledgeable and attentive, but also carried herself with a warmth and elegance that made the entire experience truly enjoyable.',
      createTime: '2026-10-05T16:18:05.384611Z',
      reviewReply: {
        comment: 'Thank you so much for taking the time to share such kind words! We are delighted to hear that you had a wonderful experience. We truly appreciate your loyalty and look forward to welcoming you back soon!',
        updateTime: '2026-10-14T09:53:52.201881Z',
      },
    },
  ],
};

/**
 * Fetches Google reviews from Featurable API with 1-hour ISR revalidation.
 * Falls back to verified cached reviews if the endpoint is unreachable or errors.
 */
export async function getCustomerReviews(): Promise<FeaturableWidgetData> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`Featurable API returned status ${res.status}. Using fallback reviews.`);
      return FALLBACK_REVIEWS;
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.reviews) || data.reviews.length === 0) {
      return FALLBACK_REVIEWS;
    }

    return {
      success: data.success ?? true,
      widget: data.widget || WIDGET_ID,
      averageRating: Number(data.averageRating) || 4.9,
      totalReviewCount: Number(data.totalReviewCount) || data.reviews.length,
      profileUrl: data.profileUrl || FALLBACK_REVIEWS.profileUrl,
      reviews: data.reviews,
    };
  } catch (error) {
    console.warn('Failed to fetch reviews from Featurable API, using fallback data:', error);
    return FALLBACK_REVIEWS;
  }
}

