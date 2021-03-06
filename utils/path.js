/** A list of paths to specific pages */
const path = {
  index: "/",
  platform: {
    imageAnnotation: "/platform/image-annotation",
    textAnnotation: "/platform/text-annotation",
    audioAnnotation: "/platform/audio-annotation",
    videoAnnotation: "/platform/video-annotation",
  },
  company: {
    aboutUs: "/company/about-us",
    resources: "/company/resources",
    help: "/company/help",
    company: "/company/company",
  },
  projects: {
    dashboard: "/projects/dashboard",
    label: "/projects/label",
    newProject: "/projects/new-project",
    uploadData: "/projects/upload-data",
    taxonomy: "/projects/taxonomy",
  },
  auth: {
    forgotPassword: "/auth/forgot-password",
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    newUser: "/auth/new-user",
    setNewPassword: "/auth/set-new-password",
  },
  user: {
    apiKeys: "/user/api-keys",
    billingInfo: "/user/billing-info",
    profile: "/user/profile",
    team: "/user/team",
  },
  social: {
    facebook: "https://www.facebook.com/datapick.tech",
    github: "https://github.com/choutkamartin/datapick",
  },
  termsOfService: "/terms-of-service",
  privacyPolicy: "/privacy-policy",
  contact: "/contact",
  help: {
    general: "/help/general",
    api: "/help/api",
  },
};

export default path;
