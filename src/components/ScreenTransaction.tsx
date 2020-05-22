import * as React from 'react';
import { ScreenEnum, TransitionState, TransitionStyles } from '../game/types';
import { Transition, TransitionGroup } from 'react-transition-group';

type Props = Readonly<{
  current: ScreenEnum;
  intro: JSX.Element;
  game: JSX.Element;
  over: JSX.Element;
}>;

const ANIM_DURATION_MS = 750;

const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  transition: `opacity ${ANIM_DURATION_MS}ms ease-in-out`,
  opacity: 0,
  fontSize: '3rem'
};

const transitionStyles: TransitionStyles = {
  // entering: { opacity: 0 },
  entered: { opacity: 1 }
  // exited: { opacity: 0 },
  // exiting: { opacity: 0 }
};

const Intro = ScreenEnum.Intro;
const Game = ScreenEnum.Game;
const Over = ScreenEnum.Over;

export function ScreenTransaction({ current, intro, game, over }: Props) {
  const screens = current === Intro ? [Intro] : current === Game ? [Game] : [Over];

  return (
    <TransitionGroup component={null}>
      {screens.map(x => (
        <Transition key={x} timeout={ANIM_DURATION_MS}>
          {(state: TransitionState) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {x === Intro ? intro : x === Game ? game : over}
            </div>
          )}
        </Transition>
      ))}
    </TransitionGroup>
  );
}