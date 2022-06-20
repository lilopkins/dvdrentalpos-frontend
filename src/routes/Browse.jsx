import Pageable from "../components/Pageable";
import "./Browse.css";

export default function Browse() {
    return (
        <div className="browse">
            <h1>Browse Films</h1>

            <Pageable
                uri="/films"
                sortable-by={{'title': 'Film Title'}}
                generator={item => (
                    <div>
                        <div className="film-card">
                            <div>
                                <span className="title">{item.title}</span>
                                <span className={'rating rating-' + item.rating}>{item.rating}</span>
                            </div>
                            <span className="lang">{item.language.name}</span>
                            <p>{item.description}</p>
                        </div>
                    </div>
                )} />
        </div>
    );
}
