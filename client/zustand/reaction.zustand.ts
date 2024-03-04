import { create } from "zustand";
import useBlogStore from "./blog.zustand";
// import {persist,devtools} from "zustand/middleware"

// const domain = "http://localhost:3006";
const domain = "https://blog-app-server-ecru.vercel.app";
interface ReactionState {
    reactions:{
        happy: number,
        satisfacton: number,
        sad: number,
        love: number,
        surprise: number,
        angry: number 
    };

    handleReaction: (key:string, blogId: string) => void
}

const ReactionStore =  (set: any) => ({
    reactions:{
        happy: 0,
        satisfacton: 0,
        sad: 0,
        love: 0,
        surprise: 0,
        angry: 0, 
    },

    handleReaction: async (key:string, blogId: string) => set(async (state: ReactionState) => {
        try {
            let localAuth: any = localStorage.getItem('Auth');
            localAuth = JSON.parse(localAuth);
            if (localAuth) {
                const res = await fetch(`${domain}/blog/reaction/${blogId}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${localAuth.state.token}`
                    },
                    body:JSON.stringify({
                        type: key
                    })
                });
                const reactions = await res.json();
            }
        } catch (error) {
            console.log(error);
            
        }
    })
})
const useReactionStore = create<ReactionState>(ReactionStore);
export default useReactionStore;
