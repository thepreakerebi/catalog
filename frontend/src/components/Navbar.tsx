import { ShoppingBag, SquarePlus, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <header className={'bg-gray-700 w-max-[1140px] p-4 fixed top-0 right-0 left-0'}>
        <section className={'flex items-center justify-between'}>
            <Link to={'/'}>
                <h1 className={"flex gap-1 items-center text-lg font-medium"}>
                    Catalog <ShoppingBag size={20} />
                </h1>
            </Link>
            <section className={'flex align-center gap-4'}>
                <Link className={'navbar-btn'} to={'/create'}>
                    <SquarePlus size={20} />
                </Link>
                <Link className={'navbar-btn'} to={'/create'}>
                    <Sun size={20} />
                </Link>
            </section>
        </section>
    </header>
  )
}