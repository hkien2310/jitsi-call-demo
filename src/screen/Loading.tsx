import { CircularProgress } from "@mui/material"

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
    console.log(isLoading, 'isLoadingisLoading')
    if (!isLoading) return null
    return <div style={{ zIndex: 10, background: 'rgba(0, 0, 0, 0.3)',height: '100vh', width: '100vw', position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
    </div>
}

export default LoadingScreen