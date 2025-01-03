import PostDetailHead from "./post-detail-head";
import PostFlowHead from "./post-flow-head";


// export const routeArray = ['/', '/feed/detail/[id]']
export const routeArray = [
    {
        path: '/',
        node: <PostFlowHead />
    },
    {
        path: '/feed/detail/[id]',
        node: <PostDetailHead />
    }
]