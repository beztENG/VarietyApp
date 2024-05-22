const pallete = [
    {
        text: '#f97316',
        bgColor: opacity => `rgba(251,146,60, ${opacity})`
    },
    {
        text: '#334155',
        bgColor: opacity => `rgba(30,41,59, ${opacity})`
    },
    {
        text: '#7c3aed',
        bgColor: opacity => `rgba(167,139,258, ${opacity})`
    },
    {
        text: '#009950',
        bgColor: opacity => `rgba(0,179,89, ${opacity})`
    },
    {
        text: '#14b8a6',
        bgColor: opacity => `rgba(45,212,191, ${opacity})`
    },
    {
        text: '#dc2626',
        bgColor: opacity => `rgba(248,113,113, ${opacity})`
    },
]

export const themeColors ={
    ...pallete[4]
}