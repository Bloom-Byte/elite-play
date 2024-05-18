import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
import './VIPPopup.css';
import instance from '../utils/api';
import { useAppContext } from '../hooks/useAppContext';
import { useUpdateUser } from '../hooks/useUpdateUser';

register();

const VIPPopup = ({ onCloseVIP, timeToNextClaim, facuetClaimableForCurrentTier, totalClaim, setTimeToNextClaim }) => {

  const swiperElRef = useRef(null);

  const { state } = useAppContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeToNextClaim > 0) {
        setTimeToNextClaim(timeToNextClaim - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeToNextClaim, setTimeToNextClaim]);

  const updateUser = useUpdateUser();

  const handleClaimToken = async () => {
    try {
      const response = await instance.post('/faucet/claim', {});

      if ((response.status === 200 || response.status === 201)) {
        const responseData = response.data;
        const responseInfo = await instance.get(
          '/faucet/total-faucet-claimed',
        );
        const data = responseInfo.data;
        setTimeToNextClaim(data.timeToNextClaim);
        updateUser();
      } else {
        console.error('Error claiming token:', response.statusText);
      }
    } catch (error) {
      console.error('Error claiming token:', error);
    }
  };

  useEffect(() => {
    const swiperContainer = swiperElRef.current;
    const params = {
      //   navigation: true,
      //   pagination: true,
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  const handleSliderChange = () => {
    const swiperContainer = swiperElRef.current.swiper;
    swiperContainer.slideNext();
  };

  const handleSliderPrev = () => {
    const swiperContainer = swiperElRef.current.swiper;
    swiperContainer.slidePrev();
  };

  return (
    <div className="vippopup">
      <div className="vippopup-content">
        <div className="vippopup-header">
          <img className="vipribbon" src="./vip-ribbon.svg" alt="vip-icon" />
          <img
            onClick={() => onCloseVIP()}
            className="vipclose"
            src="./cancel-x.svg"
            alt="cancel-icon"
          />
        </div>
        <div className="scrollsection">
          <div className="vippopup-desc">
            <p>
              Level up to get exclusive access to generous rewards and
              personalized gifts! Join our community of elite players and enjoy
              the best that online gaming has to offer.{' '}
              <span className="highlight-level"> View level up details</span>
            </p>
          </div>
          <div className="vippopup-progess_boxes">
            <div
              className="viplevel-box"
              style={{ backgroundImage: 'url(./bronze_bg.jpg)' }}
            >
              <h3>Your VIP Progress</h3>
              <p className="xplevel">65 XP</p>
              <input type="range" max="20000000" value={state.user?.totalBetAmount} />
              <p className="xplevel">{state.user?.amountToNextTier} XP until {state.user?.nextTier}</p>
            </div>
            <div className="vippopup-reward-box">
              <h3>Faucet Reward</h3>
              <h2>
                <img
                  className="levelcoin"
                  src="./twemoji_coin.svg"
                  alt="coin-icon"
                />{' '}
                <span className="coinlevel-rewards">{facuetClaimableForCurrentTier}</span>
              </h2>
              <p className="reward-details">
                Total Reward Claimed <span className="coinamount">{totalClaim}</span>{' '}
                <span>
                  Next Reward in:{' '}
                  <span className="nextrewardtime">
                    {Math.ceil(timeToNextClaim / 1000)}s left
                  </span>
                </span>
              </p>
              <button
                onClick={handleClaimToken}
                disabled={timeToNextClaim > 0}
                className={`${timeToNextClaim > 0 ? 'disabled ' : ''
                  }vippopup-claimreward-btn`}
              >
                Claim Reward
              </button>
            </div>
          </div>
          <div className="alllevels">
            <h2>VIP LEVELS</h2>
            {/* <div className="viplevels-boxes"> */}
            <swiper-container
              ref={swiperElRef}
              slides-per-view="3"
              init="false"
            >
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./beginner.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>1,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.0026</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./novice.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>50,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.0049</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./bronze.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>250,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.0096</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./silver.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>1,250,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.0139</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./gold.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>2,000,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.0208</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./platinum.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>5,000,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.0369</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./diamond.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>7,500,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.0596</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./emrald.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>10,000,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.1217</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./ruby.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>12,500,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>0.2536</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./sapphire.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>15,000,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span> 0.573</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div className="vippopuplevel_box">
                  <div className="vippopuplevel_box-reward-image">
                    <img src="./black-diamond.svg" alt="bronzereward" />
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Rewards</span>
                    <span>20,000,000</span>
                  </div>
                  <div className="vippopuplevel_box-reward">
                    <span>Faucet Rewards</span>
                    <span>1.777</span>
                  </div>
                </div>
              </swiper-slide>
            </swiper-container>
            {/* </div> */}
          </div>
          <div className="vippopup-bottom-navs">
            <img
              onClick={handleSliderPrev}
              id="prev"
              src="./Previous.svg"
              alt="previous-arrow"
            />
            <img
              onClick={handleSliderChange}
              id="next"
              src="./Next.svg"
              alt="next-arrow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPPopup;
