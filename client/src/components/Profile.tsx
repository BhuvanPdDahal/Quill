import { PEOPLE_TAB } from '../constants';
import ProfileImg from '../images/profile.png';
import { ProfileProps } from '../interfaces/sidebar';

const Profile = ({ activeTab }: ProfileProps) => {
    if (activeTab === PEOPLE_TAB) return (
        <img className='h-50px w-50px object-cover rounded-full' src={ProfileImg} alt="profile" />
    );

    return (
        <div>
            <img className='h-40px w-40px object-cover rounded-full mb-n30px ml-4' src={ProfileImg} alt="profile" />
            <img className='h-40px w-40px object-cover rounded-full' src={ProfileImg} alt="profile" />
        </div>
    );
}

export default Profile;